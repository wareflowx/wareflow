export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div>
      <h1>Project: {(await params).slug}</h1>
    </div>
  );
}
