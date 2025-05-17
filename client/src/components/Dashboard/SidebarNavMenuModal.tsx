import { useEffect, useRef, useState } from "react";

interface SidebarNavMenuModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
}

export function SidebarNavMenuModal({
  open,
  setOpen,
  triggerRef,
}: SidebarNavMenuModalProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }
  }, [open, triggerRef]);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="absolute z-50 w-36 bg-gray-900 border border-gray-700 rounded-md shadow-xl"
      style={{ top: position.top, left: position.left }}
    >
      <button
        onClick={() => {
          console.log("Delete clicked");
          setOpen(false);
        }}
        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-800 rounded-md"
      >
        Delete
      </button>
    </div>
  );
}
