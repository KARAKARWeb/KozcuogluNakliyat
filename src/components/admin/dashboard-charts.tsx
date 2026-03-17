"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Oca', ziyaretci: 4000, teklif: 240, dönüşüm: 6 },
  { month: 'Şub', ziyaretci: 3000, teklif: 198, dönüşüm: 6.6 },
  { month: 'Mar', ziyaretci: 5000, teklif: 400, dönüşüm: 8 },
  { month: 'Nis', ziyaretci: 4500, teklif: 360, dönüşüm: 8 },
  { month: 'May', ziyaretci: 6000, teklif: 480, dönüşüm: 8 },
  { month: 'Haz', ziyaretci: 5500, teklif: 440, dönüşüm: 8 },
];

const categoryData = [
  { name: 'Evden Eve', value: 400, color: '#0088FE' },
  { name: 'Kurumsal', value: 300, color: '#00C49F' },
  { name: 'Depolama', value: 200, color: '#FFBB28' },
  { name: 'Paketleme', value: 100, color: '#FF8042' },
];

const regionData = [
  { region: 'Ankara', count: 45 },
  { region: 'İstanbul', count: 38 },
  { region: 'İzmir', count: 25 },
  { region: 'Bursa', count: 18 },
  { region: 'Antalya', count: 15 },
];

export function TrafficChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aylık Ziyaretçi Trafiği</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ziyaretci" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="teklif" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function CategoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hizmet Kategorileri Dağılımı</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function RegionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bölge Bazlı Teklif Sayısı</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={regionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function ConversionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dönüşüm Oranı Trendi</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="dönüşüm" stroke="#ff7300" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
