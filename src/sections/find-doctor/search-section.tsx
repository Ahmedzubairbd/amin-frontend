"use client";

import { useState } from "react";
import { Input, Select, MenuItem } from "@mui/material";
import { Button } from "@mui/base";
import { Card } from "@mui/material";
import { Search } from "@mui/icons-material";


const specialties = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Ophthalmology",
  "Oncology",
  "Gynecology",
];

export function SearchSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("");

  return (


        <Card className="p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Find Your Doctor</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by doctor's name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-64">
                <Select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select specialty
                  </MenuItem>
                  {specialties.map((s) => (
                    <MenuItem key={s} value={s.toLowerCase()}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <Button className="w-full md:w-auto">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </Card>


  );
}