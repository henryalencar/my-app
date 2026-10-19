
import {lembreteDados} from '../data/lembreteDados';


export function getAllLembretes() {
  return lembreteDados.lembretes;
}

export function getLembreteById(lembreteId: number) {
  return lembreteDados.lembretes.find(lembrete => lembrete.lembreteId === lembreteId);
}
