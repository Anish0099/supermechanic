# Database Schema Documentation for Vehicle Services Platform

## Overview

This document outlines the database schema for the Vehicle Services Platform, which serves customers, mechanics, and administrators. The schema is designed to support various functionalities such as user management, service bookings, vehicle management, and payment processing.

## Entities

### 1. Users
- **user_id**: UUID (Primary Key)
- **name**: String
- **email**: String (Unique)
- **password_hash**: String
- **role**: Enum (Customer, Mechanic, Admin)
- **created_at**: DateTime
- **updated_at**: DateTime

### 2. Vehicles
- **vehicle_id**: UUID (Primary Key)
- **user_id**: UUID (Foreign Key to Users)
- **make**: String
- **model**: String
- **year**: Integer
- **license_plate**: String (Unique)
- **created_at**: DateTime
- **updated_at**: DateTime

### 3. Services
- **service_id**: UUID (Primary Key)
- **name**: String
- **description**: String
- **price**: Decimal
- **created_at**: DateTime
- **updated_at**: DateTime

### 4. Bookings
- **booking_id**: UUID (Primary Key)
- **user_id**: UUID (Foreign Key to Users)
- **vehicle_id**: UUID (Foreign Key to Vehicles)
- **service_id**: UUID (Foreign Key to Services)
- **booking_date**: DateTime
- **status**: Enum (Pending, Confirmed, Completed, Cancelled)
- **created_at**: DateTime
- **updated_at**: DateTime

### 5. Payments
- **payment_id**: UUID (Primary Key)
- **booking_id**: UUID (Foreign Key to Bookings)
- **amount**: Decimal
- **payment_date**: DateTime
- **status**: Enum (Pending, Completed, Failed)
- **created_at**: DateTime
- **updated_at**: DateTime

### 6. Reviews
- **review_id**: UUID (Primary Key)
- **user_id**: UUID (Foreign Key to Users)
- **mechanic_id**: UUID (Foreign Key to Users)
- **rating**: Integer (1 to 5)
- **comment**: String
- **created_at**: DateTime
- **updated_at**: DateTime

## Relationships

- A **User** can have multiple **Vehicles**.
- A **User** can create multiple **Bookings**.
- A **Booking** is associated with one **Vehicle** and one **Service**.
- A **Payment** is linked to one **Booking**.
- A **User** can leave multiple **Reviews** for different **Mechanics**.

## Conclusion

This schema provides a comprehensive structure for managing vehicle services, ensuring that all necessary data is captured and relationships are maintained for efficient operations.