import { string, date, object } from "zod";

export const LoginFormSchema = object({
  email: string({ required_error: "Email / username is required" }).min(4, {
    message: "Email / username is too short",
  }),
  password: string({ required_error: "Password is required" }).min(8),
});

export const VesselFormSchema = object({
  name: string({ required_error: "Vessel name is required" }).min(4, {
    message: "Vessel name is too short",
  }),
  pbm: string({ required_error: "PBM is required" }).min(3, {
    message: "PBM is too short",
  }),
  mechanic: string({ required_error: "Mechanic is required" }).min(4, {
    message: "Mechanic is too short",
  }),
  foreman: string({ required_error: "Foreman is required" }),
  dozer: string({ required_error: "dozer is required" }).regex(/([0-9])/, {
    message: "Only number allowed",
  }),
  loader: string({ required_error: "dozer is required" }).regex(/([0-9])/, {
    message: "Only number allowed",
  }),
  muatan: string({ required_error: "Muatan is required" }).regex(/([0-9])/, {
    message: "Only number allowed",
  }),
  start_date: date({ required_error: "Start date is required" }),
  end_date: date().optional(),
  posisi: string({ required_error: "Posisi is required" }).min(4, {
    message: "Posisi is required",
  }),
});

export const VesselUpdateSchema = object({
  id: string({ required_error: "Vessel name is required" }),
  name: string({ required_error: "Vessel name is required" }).min(4, {
    message: "Vessel name is too short",
  }),
  pbm: string({ required_error: "PBM is required" }).min(3, {
    message: "PBM is too short",
  }),
  mechanic: string({ required_error: "Mechanic is required" }).min(4, {
    message: "Mechanic is too short",
  }),
  foreman: string({ required_error: "Foreman is required" }),
  dozer: string({ required_error: "dozer is required" }).regex(/([0-9])/, {
    message: "Only number allowed",
  }),
  loader: string({ required_error: "dozer is required" }).regex(/([0-9])/, {
    message: "Only number allowed",
  }),
  muatan: string({ required_error: "Muatan is required" }).regex(/([0-9])/, {
    message: "Only number allowed",
  }),
  start_date: date({ required_error: "Start date is required" }),
  end_date: date().optional(),
  posisi: string({ required_error: "Posisi is required" }).min(4, {
    message: "Posisi is required",
  }),
});

export const FuelFormSchema = object({
  shipId: string({ required_error: "Vessel name is required" }).min(4, {
    message: "Vessel name is too short",
  }),
  fuel_usage: string({ required_error: "dozer is required" }).regex(/([0-9])/, {
    message: "Only number allowed",
  }),
  date: string({ required_error: "Start date is required" }).min(4, {
    message: "Start date is required",
  }),
});

export const ShipOptRent = object({
  shipId: string({ required_error: "Vessel name is required" }),
  phone: string({ required_error: "phone is required" }).regex(/([0-9])/, {
    message: "Only number allowed",
  }),
  nama: string({ required_error: "name is required" }).min(3, {
    message: "Minimum 3 character",
  }),
  type: string({ required_error: "type is required" }),
});
