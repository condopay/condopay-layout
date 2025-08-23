import { Building2, Home, Users } from "lucide-react";

import Layout from "@/components/common/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { TabCondInfo } from "./components/tab-cond-info/tab-cond-info";
import { TabUsers } from "./components/tab-users.tsx/tab-users";

export default function PainelPage() {
  return (
    <Layout>
      <Tabs defaultValue="condominio">
        <TabsList className="mb-4 grid w-full max-w-xl grid-cols-3">
          <TabsTrigger value="condominio" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden md:block">Condomínio</span>
          </TabsTrigger>
          <TabsTrigger value="unidades" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden md:block">Unidades</span>
          </TabsTrigger>
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:block">Usuários</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="condominio">
          <TabCondInfo />
        </TabsContent>
        <TabsContent value="unidades">
          <h1>Unidades</h1>
        </TabsContent>
        <TabsContent value="usuarios">
          <TabUsers />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
