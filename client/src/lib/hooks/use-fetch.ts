import useSWR from 'swr';
import {useToast} from "@/components/ui/use-toast";
import {useEffect} from "react";

function useFetch(key: string, fetcher: (...args: any) => any) {
  const {data, error, mutate} = useSWR(key, fetcher);
  const {toast} = useToast();

  useEffect(() => {
    if (error) {
      const errorMessage = error.message || "不明なエラーが発生しました。";
      toast({
        title: "エラー",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return {fetchData: data, error, mutate};
}

export default useFetch;