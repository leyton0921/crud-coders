import { CoderService } from "@/services/coders.services";
import CodersTable from "./coders/codersTable";

export default async function Home() {

  const UseCoderService = new CoderService()
  const data = await UseCoderService.findAll()
  return (
    <div>
      <CodersTable data={data}/>
    </div>

    );
}
