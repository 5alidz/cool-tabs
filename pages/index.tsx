import { useCallback, useEffect, useRef, useState } from 'react';

const fruites = ['apple', 'mango', 'bannana', 'kiwi', 'orange'];

export default function Home() {
  const [active, setActive] = useState(() => fruites[0]);
  const followerTabRef = useRef<null | HTMLDivElement>(null);
  const parentRef = useRef<null | HTMLDivElement>(null);

  const calculateFollowerPosition = useCallback(() => {
    const follower = followerTabRef.current;
    const target = document.querySelector(`[data-id="${active}"]`);
    const parent = parentRef.current;
    if (!follower || !target || !parent) return;
    const targetRect = target.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const leftPadding = window
      .getComputedStyle(parent)
      .getPropertyValue('padding-left');

    follower.style.width = `${targetRect.width}px`;
    follower.style.height = `${targetRect.height}px`;
    follower.style.transform = `translateX(${
      targetRect.left - (parentRect.left + parseInt(leftPadding))
    }px)`;
  }, [active]);

  useEffect(() => {
    calculateFollowerPosition();
  }, [active]);

  return (
    <main className='flex items-center w-full min-h-screen p-2 jusitfy-center'>
      <div
        className='flex items-center w-full max-w-4xl mx-auto [&>*]:flex-1 rounded-lg bg-blue-100 p-1 relative overflow-x-hidden'
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
            onClick={() => setActive(fruit)}
            className='z-10 flex justify-center w-full h-full py-3 rounded-lg'
          >
            <div className='text-sm font-semibold text-blue-900 capitalize md:text-base lg:text-lg'>
              {fruit}
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
