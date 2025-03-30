import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface WeatherStats {
  PRCP: number;
  TMAX: number;
  TAVG: number;
  AWND: number;
  zipcode: number;
  SNOW: number;
  TMIN: number;
}

interface WeatherStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeatherStats | null;
}

export function WeatherStatsModal({ isOpen, onClose, data }: WeatherStatsModalProps) {
  if (!data) return null;

  const temperatureData = [
    { name: 'Min', temp: data.TMIN },
    { name: 'Avg', temp: data.TAVG },
    { name: 'Max', temp: data.TMAX },
  ];

  const conditionsData = [
    { name: 'Precipitation', value: data.PRCP },
    { name: 'Snow', value: data.SNOW },
    { name: 'Wind', value: data.AWND },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] backdrop-blur-sm bg-white/50 border border-white/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-black">
            Weather Statistics for ZIP: {data.zipcode}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 p-4">
          {/* Temperature Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg backdrop-blur-md bg-white/20 border border-white/10"
          >
            <h3 className="text-sm font-semibold mb-4 text-black">Temperature Range</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={temperatureData}>
                <XAxis dataKey="name" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    border: 'none'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Conditions Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-lg backdrop-blur-md bg-white/20 border border-white/10"
          >
            <h3 className="text-sm font-semibold mb-4 text-black">Weather Conditions</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={conditionsData}>
                <XAxis dataKey="name" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    border: 'none'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-4"
          >
            <div className="p-4 rounded-lg backdrop-blur-md bg-white/20 border border-white/10">
              <p className="text-xs text-black/60">Wind Speed</p>
              <p className="text-2xl font-bold text-black">{data.AWND} mph</p>
            </div>
            <div className="p-4 rounded-lg backdrop-blur-md bg-white/20 border border-white/10">
              <p className="text-xs text-black/60">Precipitation</p>
              <p className="text-2xl font-bold text-black">{data.PRCP} mm</p>
            </div>
            <div className="p-4 rounded-lg backdrop-blur-md bg-white/20 border border-white/10">
              <p className="text-xs text-black/60">Snow</p>
              <p className="text-2xl font-bold text-black">{data.SNOW} mm</p>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 