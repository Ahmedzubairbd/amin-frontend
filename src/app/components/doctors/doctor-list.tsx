"use client";

import { Card } from "@mui/material";
import { m } from "framer-motion";
import { Doctor } from "src/types/doctor";

interface DoctorListProps {
  doctors: Doctor[];
}

export function DoctorList({ doctors }: DoctorListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {doctors.map((doctor, index) => (
        <m.div
          key={doctor.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold">{doctor.name}</h3>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Available: {doctor.availability}
                </p>
              </div>
            </div>
          </Card>
        </m.div>
      ))}
    </div>
  );
}