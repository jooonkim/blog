import '../agentic/post.css';
import Contents from '../agentic/contents';

export default function TacitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Contents />
      <article className="agentic-post">{children}</article>
    </>
  );
}
