import Header from "./Header";

export default function PageHeader({ title, back = true }: { title: string; back?: boolean }) {
  return <Header title={title} back={back} />;
}
