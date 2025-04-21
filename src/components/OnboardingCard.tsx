"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { title } from "process";

const OnboardingCard = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyCity: "",
    companyCountry: "",
    position: "",
  });
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState("Onboarding")
  const router = useRouter();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch("/api/onboarding", {
            method: "GET"
        }); // Adjust the endpoint as needed
        const data = await response.json();
        if (data.success) {
          setFormData({
            companyName: data.companyName,
            companyCity: data.companyCity,
            companyCountry: data.companyCountry,
            position: data.position,
          });
          setHeading("Company Details")
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompanyDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnboarding = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      // Redirect to home on successful onboarding
      router.push("/");
    } catch (error) {
      console.error("Error saving company details:", error);
      setError(error.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{heading}</CardTitle>
        <CardDescription>
          Give details about your Company/Business to make the Agreement Generation complete
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleOnboarding}>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          <Label htmlFor="companyCity">Company City</Label>
          <Input
            type="text"
            name="companyCity"
            value={formData.companyCity}
            onChange={handleChange}
          />
          <Label htmlFor="companyCountry">Company Country</Label>
          <Input
            type="text"
            name="companyCountry"
            value={formData.companyCountry}
            onChange={handleChange}
          />
          <Label htmlFor="position">Position held in Company</Label>
          <Input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button className="bg-voilet" type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OnboardingCard;
