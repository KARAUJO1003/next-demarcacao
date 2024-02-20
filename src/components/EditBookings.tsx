'use client'

import { SyntheticEvent, useState } from 'react';

export default function EditBookingPage() {
  const [id, setId] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cliente, setCliente] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [quadra, setQuadra] = useState('');
  const [lote, setLote] = useState('');
  const [status, setStatus] = useState('');
  const [benfeitoria, setBenfeitoria] = useState('');
  const [dtAgendamento, setDtAgendamento] = useState('');
  const [horarioDoAgen, setHorarioDoAgen] = useState('');
  const [respPeloAgendamento, setRespPeloAgendamento] = useState('');
  const [demarcador, setDemarcador] = useState('');
  const [statusDaVenda, setStatusDaVenda] = useState('');
  const [obs, setObs] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          empresa,
          cliente,
          cpf_cnpj: cpfCnpj,
          quadra,
          lote,
          status,
          benfeitoria,
          dt_agendamento: dtAgendamento,
          horario_do_agen: horarioDoAgen,
          resp_pelo_agendamento: respPeloAgendamento,
          demarcador,
          status_da_venda: statusDaVenda,
          obs,
        }),
      });
      const data = await response.json();
      setMessage('Item atualizado com sucesso!');
    } catch (error) {
      setMessage('Erro ao atualizar o item.');
    }
  };

  return (
    <div>
      <h1>Editar Reserva</h1>
      <form onSubmit={handleSubmit}>
        <label>ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <label>Empresa:</label>
        <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
        {/* Outros campos de entrada para as propriedades do item de reserva */}
        <button type="submit">Atualizar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
