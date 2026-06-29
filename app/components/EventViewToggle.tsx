'use client'

export function EventViewToggle() {
  return (
    <script>
      {`
        const btnList = document.getElementById('btn-list');
        const btnGrid = document.getElementById('btn-grid');
        const listView = document.getElementById('list-view');
        const gridView = document.getElementById('grid-view');

        if (btnList && btnGrid && listView && gridView) {
          btnList.addEventListener('click', () => {
            listView.classList.remove('hidden');
            gridView.classList.add('hidden');
            btnList.classList.add('bg-white', 'shadow-sm', 'text-[--deep-rose]');
            btnList.classList.remove('text-secondary');
            btnGrid.classList.remove('bg-white', 'shadow-sm', 'text-[--deep-rose]');
            btnGrid.classList.add('text-secondary');
          });

          btnGrid.addEventListener('click', () => {
            gridView.classList.remove('hidden');
            listView.classList.add('hidden');
            btnGrid.classList.add('bg-white', 'shadow-sm', 'text-[--deep-rose]');
            btnGrid.classList.remove('text-secondary');
            btnList.classList.remove('bg-white', 'shadow-sm', 'text-[--deep-rose]');
            btnList.classList.add('text-secondary');
          });
        }
      `}
    </script>
  )
}