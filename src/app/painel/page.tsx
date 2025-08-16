import Header from "@/components/common/Header";
import { SideMenu } from "@/components/common/sidemenu";

export default function Painel() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <SideMenu />
        <main className="flex-1 rounded-t-md bg-white p-6 md:ml-0">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-3xl font-bold text-black">Painel</h1>
          </div>
        </main>
      </div>
    </div>
  );
}
