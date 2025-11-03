import { api } from '../../../shared/api/client';
import type { Servico } from '../interface/servico';

export async function getServices(): Promise<Servico[]> {
  const { data } = await api.get<Servico[]>('/services');
  return data;
}
