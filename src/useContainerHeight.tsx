import { useState, useEffect, RefObject } from "react";

// 第2引数のオプションの型
type UseContainerHeightOptionProps = {
  // 任意の依存関係
  dependencies?: any[];
  // リサイズ時に高さの再計算を無効にする: trueで無効
  disableResizeCalculation?: boolean;
};

export const useContainerHeight = <T extends HTMLElement>(
  ref: RefObject<T>,
  { dependencies, disableResizeCalculation }: UseContainerHeightOptionProps = {}
): number => {
  // 要素の高さを保持するstate
  const [containerHeight, setContainerHeight] = useState(0);

  // 要素の高さを取得する
  const getHeight = () => {
    if (!ref.current) return;
    const targetContainer = ref.current;

    // 要素のコピーを作成し、親要素に追加する
    const ghostContainer = targetContainer.cloneNode(true) as T;
    targetContainer.parentNode?.appendChild(ghostContainer);

    // コピーのスタイルを設定して、高さを取得する
    ghostContainer.style.cssText =
      "display:block; height:auto; visibility:hidden;";
    const height = ghostContainer.offsetHeight;

    // コピーを削除する
    targetContainer.parentNode?.removeChild(ghostContainer);

    // 要素の高さをstateに設定する
    setContainerHeight(height);
  };

  // コンポーネントのマウント時とdisableResizeCalculation変更時にイベントリスナーを登録&削除する
  useEffect(() => {
    if (disableResizeCalculation) return;
    // リサイズ時に要素の高さを再計算する
    window.addEventListener("resize", getHeight);
    return () => {
      window.removeEventListener("resize", getHeight);
    };
  }, [ref, disableResizeCalculation]);

  // コンポーネントのマウント時と任意の依存関係が変化したときにも要素の高さを計算する
  useEffect(
    () => {
      getHeight();
    },
    dependencies ? dependencies : []
  );

  return containerHeight;
};