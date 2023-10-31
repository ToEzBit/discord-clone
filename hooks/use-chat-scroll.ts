import { useEffect, useState } from "react";

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement>;
  buttomRef: React.RefObject<HTMLDivElement>;
  sholdLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({
  chatRef,
  buttomRef,
  sholdLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const topDiv = chatRef?.current;

    const handlerScroll = () => {
      const scrollTop = topDiv?.scrollTop;
      if (scrollTop === 0 && sholdLoadMore) {
        loadMore();
      }
    };

    topDiv?.addEventListener("scroll", handlerScroll);
    return () => {
      topDiv?.removeEventListener("scroll", handlerScroll);
    };
  }, [sholdLoadMore, loadMore, chatRef]);

  useEffect(() => {
    const buttomDiv = buttomRef?.current;
    const topDiv = chatRef?.current;
    const shouldAutoScroll = () => {
      if (!hasInitialized && buttomDiv) {
        setHasInitialized(true);
        return true;
      }
      if (!topDiv) {
        return false;
      }

      const distanceFormButtom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFormButtom <= 100;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        buttomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [buttomRef, chatRef, count, hasInitialized]);
};
