import { SideMenu } from "@/components/common/sidemenu";

const RelatoriosPage = () => {
  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <main className="flex-1 p-6 md:ml-0">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold">Relatórios</h1>
        </div>
      </main>
    </div>
  );
};

export default RelatoriosPage;
