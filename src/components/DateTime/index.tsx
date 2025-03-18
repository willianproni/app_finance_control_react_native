import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { Text } from 'react-native-paper'
import { ButtonDate, TextButton } from './styles'

export default (props: any) => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [FormatDate, setFormatDate] = useState(String)

  function convertDate() {
    const year = date.getFullYear();
    const month = date.getMonth() + 1
    props.function(year, month)
  }

  function FormatDateSelect() {
    const test = moment(date).format('MM/YYYY')
    setFormatDate(test)
  }

  useEffect(() => {
    FormatDateSelect()
    convertDate()
  }, [date])

  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <ButtonDate onPress={() => setOpen(true)}>
          <TextButton>Escolher Data</TextButton>
        </ButtonDate>
        <DatePicker
          modal
          theme='dark'
          title={"Selecione a Data"}
          open={open}
          date={date}
          is24hourSource='locale'
          cancelText='Cancelar'
          confirmText='Confirmar'
          onDateChange={setDate}
          mode='date'
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />
      </View>
      <Text style={{ textAlign: 'center', fontSize: 20, color: "#fff" }}>{FormatDate}</Text>
    </View>
  )
}