export interface AgendaItem {
  username?: string;
  quadra?: string;
  lote?: string;
  data?: string;
  hora?: string;
  demarcador?: string | "Mauro"
  status?: "Agendado" | "Demarcado"
}

export const Demarcacao: AgendaItem[] = [
  {
    username: "Kaesyo",
    quadra: "23",
    lote: "20",
    data: "2024/01/15",
    hora: "13:00",
    status: "Agendado",
    demarcador: "Mauro",
  },
];
