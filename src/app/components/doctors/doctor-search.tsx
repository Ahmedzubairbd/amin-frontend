"use client";

import { useState, useEffect } from "react";
import { Input } from "@mui/base";
import { Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import { doctors } from "src/assets/data/doctors";
import { Doctor } from "src/types/doctor";

interface DoctorSearchProps {
  onSearch: (doctors: Doctor[]) => void;
}

export function DoctorSearch({ onSearch }: DoctorSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(filtered);
  }, [searchTerm, onSearch]);

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="flex gap-4">
        <Input
          placeholder="Search by doctor's name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-lg"
        />
        <Button className="lg">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
}