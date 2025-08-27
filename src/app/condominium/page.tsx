import { Building2, Home, Users } from "lucide-react";

import Layout from "@/components/common/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { TabCondominiumInfo } from "./components/tab-condominium/tab-condominium-info";
import { TabUsers } from "./components/tab-users.tsx/tab-users";

export default function PainelPage() {
  return (
    <Layout>
      <Tabs defaultValue="users">
        <TabsList className="mb-4 grid w-full max-w-xl grid-cols-3">
          <TabsTrigger value="condominium" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden md:block">Condomínio</span>
          </TabsTrigger>
          <TabsTrigger value="units" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden md:block">Unidades</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:block">Usuários</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="condominium">
          <TabCondominiumInfo />
        </TabsContent>
        <TabsContent value="units">
          <h1>Unidades</h1>
        </TabsContent>
        <TabsContent value="users">
          <TabUsers />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
