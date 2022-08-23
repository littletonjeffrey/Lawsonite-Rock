export default function MenuItem({ text, Icon, src }) {
  return (
    <a href={src}>
      <button className="hover:scale-105 flex text-white text-lg mb-2 w-36">
        <Icon className="h-7 w-16 -ml-5" />
        <span className="-ml-1">{text}</span>
      </button>
    </a>
  );
}
