import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

const fruites = ['apple', 'mango', 'bannana', 'kiwi', 'orange'];

export default function Home() {
  const [active, setActive] = useState(() => fruites[0]);
  const followerTabRef = useRef<null | HTMLDivElement>(null);
  const parentRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const follower = followerTabRef.current;
    const target = document.querySelector(`[data-id="${active}"]`);
    const parent = parentRef.current;
    if (!follower || !target || !parent) return;
    const targetRect = target.getBoundingClientRect();
    const followerRect = follower.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const xDiff = targetRect.x - followerRect.x;
    const leftPadding = window
      .getComputedStyle(parent)
      .getPropertyValue('padding-left');

    follower.style.width = `${targetRect.width}px`;
    follower.style.height = `${targetRect.height}px`;
    follower.style.transform = `translateX(${
      targetRect.left - (parentRect.left + parseInt(leftPadding))
    }px)`;

    console.log({ xDiff, targetX: targetRect.x, followerX: followerRect.x });

    console.log({ followerRect, targetRect });
  }, [active]);

  return (
    <main className='flex items-center w-full min-h-screen p-2 jusitfy-center'>
      <div
        className='flex items-center w-full max-w-4xl mx-auto [&>*]:flex-1 rounded-lg bg-blue-200 p-1 relative'
        ref={parentRef}
      >
        <div
          ref={followerTabRef}
          className='absolute transition-transform ease-in-out rounded-lg top-1 left-1 bg-gray-50/60'
        />
        {fruites.map((fruit) => (
          <button
            data-id={fruit}
            key={fruit}
            onClick={() => {
              setActive(fruit);
            }}
            className={clsx(
              'flex justify-center w-full h-full py-3 rounded-lg z-10'
            )}
          >
            <div className='text-lg font-semibold capitalize'>{fruit}</div>
          </button>
        ))}
      </div>
    </main>
  );
}
