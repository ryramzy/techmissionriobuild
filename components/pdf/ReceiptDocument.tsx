import React from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: { padding: 48, fontFamily: "Helvetica", fontSize: 11 },
  header: { marginBottom: 32 },
  org: { fontSize: 18, fontWeight: "bold", color: "#0e5c38" },
  tagline: { fontSize: 10, color: "#666", marginTop: 4 },
  divider: { borderBottom: "1px solid #e5e7eb", marginVertical: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  label: { color: "#6b7280", fontSize: 10 },
  value: { fontWeight: "bold", fontSize: 11 },
  amount: { fontSize: 22, fontWeight: "bold", color: "#0e5c38", marginVertical: 16 },
  disclaimer: { fontSize: 8, color: "#9ca3af", marginTop: 32, borderTop: "1px solid #f3f4f6", paddingTop: 12, lineHeight: 1.5 },
})

interface ReceiptProps {
  donorName: string
  donorEmail: string
  amount: number
  currency: string
  date: string
  donationId: string
  paymentMethod: "stripe" | "paypal"
  disclaimer: string
}

export function ReceiptDocument(props: ReceiptProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.org}>TechMission Rio</Text>
          <Text style={styles.tagline}>techmissionrio.org</Text>
        </View>

        <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 12 }}>Donation Receipt</Text>
        <View style={styles.divider} />

        <Text style={styles.amount}>
          ${props.amount.toFixed(2)} {props.currency.toUpperCase()}
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>Donor</Text>
          <Text style={styles.value}>{props.donorName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{props.donorEmail}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{props.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment via</Text>
          <Text style={styles.value}>
            {props.paymentMethod === "stripe" ? "Stripe" : "PayPal"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Reference ID</Text>
          <Text style={styles.value}>{props.donationId}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.disclaimer}>{props.disclaimer}</Text>
      </Page>
    </Document>
  )
}
