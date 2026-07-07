import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { INITIAL_METRICS, subscribeMockMetric } from '@/lib/mockMetricsFeed'
import type { Metric, DataPoint } from '@/types/metrics'

// query key factory — keeps keys consistent across the app
export const metricKeys = {
  all: ['metrics'] as const,
  one: (id: string) => ['metrics', id] as const,
}

// fetches the initial metric state — React Query calls this on mount
async function fetchMetrics(): Promise<Metric[]>{
    await new Promise((resolve) => {
        setTimeout(resolve, 1000)
    })

    return INITIAL_METRICS;
}

export function useMetricsFeed(){
   const queryClient = useQueryClient()

   const query = useQuery({
    queryKey: metricKeys.all,
    queryFn: fetchMetrics,
    staleTime: 5000, // caching for 5 seconds
    refetchInterval: false, // stop automatic polling; use subscription updates instead
   })

   useEffect(() => {
    if(!query.data) return;

    const toUnsubscribe = query.data.map((metric) =>
      subscribeMockMetric(metric.id, (newPoint: DataPoint) => {
        queryClient.setQueryData<Metric[]>(
          metricKeys.all,
          (prev) =>
            prev?.map((m) =>
              m.id === metric.id
                ? {
                    ...m,
                    value: newPoint.v,
                    timestamp: newPoint.t,
                    series: [...m.series.slice(-19), newPoint],
                  }
                : m
            ) ?? []
        )
      })
    )

    return () => toUnsubscribe.forEach((unsubscribe) => unsubscribe())
  }, [query.data, queryClient])

  return query
}
