import { ICoder } from "@/models/coders/coder.model";
import { HttpClient } from "@/utils/client-http";

export class CoderService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient()
  }

  async findAll() {
    try {
      const coders = this.httpClient.get<ICoder[]>("coders")
      return coders
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async destroy(id: string) {
    try {
      const coders = this.httpClient.delete<ICoder>(`coders/${id}`);

      return coders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async edit(id: string, body: { name?: string; avatar?: string }) {
    try {
      const coders = await this.httpClient.put<ICoder>(`coders/${id}`, body);
      return coders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}