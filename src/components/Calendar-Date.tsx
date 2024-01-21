"use client"

import * as React from "react"
import { ptBR } from 'date-fns/locale';

import { Calendar } from "@/components/ui/calendar"

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      locale={ptBR}
      mode="single"
      selected={date}
      className="rounded-md border w-min"
    />
  )
}
