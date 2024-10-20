import { useCallback, useEffect, useRef, useState } from "react";

interface UseInfiniteScrollProps {
  isLoading: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
}

const useInfiniteScroll = ({
  isLoading,
  isFetching,
  onLoadMore,
}: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading || isFetching || isFetchingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsFetchingMore(true);
          onLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, isFetchingMore, onLoadMore]
  );

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setIsFetchingMore(false);
    }
  }, [isLoading, isFetching]);

  return { lastElementRef };
};

export default useInfiniteScroll;
