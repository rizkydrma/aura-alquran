"use client";

import React, { useState } from "react";

const apiEndpoints = [
    {
        method: "GET",
        path: "/api/users",
        description: "Get all users with pagination",
        parameters: [
            { name: "page", type: "query", description: "Page number (default: 1)", required: false },
            { name: "limit", type: "query", description: "Items per page (default: 10)", required: false },
        ],
        example: {
            description: "Retrieve first page of users",
            params: { page: "1", limit: "5" },
        },
    },
    {
        method: "POST",
        path: "/api/users",
        description: "Create a new user",
        parameters: [
            { name: "name", type: "body", description: "User full name", required: true },
            { name: "email", type: "body", description: "User email address", required: true },
            { name: "role", type: "body", description: "User role (user/admin/moderator)", required: false },
        ],
        example: {
            description: "Create a new user",
            body: { name: "John Doe", email: "john@example.com", role: "user" },
        },
    },
    {
        method: "GET",
        path: "/api/users/[id]",
        description: "Get user by ID",
        parameters: [{ name: "id", type: "path", description: "User ID", required: true }],
        example: {
            description: "Get user with ID 1",
            params: { id: "1" },
        },
    },
    {
        method: "PUT",
        path: "/api/users/[id]",
        description: "Update user by ID",
        parameters: [
            { name: "id", type: "path", description: "User ID", required: true },
            { name: "name", type: "body", description: "Updated name", required: false },
            { name: "email", type: "body", description: "Updated email", required: false },
            { name: "role", type: "body", description: "Updated role", required: false },
        ],
        example: {
            description: "Update user name and email",
            params: { id: "1" },
            body: { name: "John Updated", email: "john.updated@example.com" },
        },
    },
    {
        method: "DELETE",
        path: "/api/users/[id]",
        description: "Delete user by ID",
        parameters: [{ name: "id", type: "path", description: "User ID", required: true }],
        example: {
            description: "Delete user with ID 5",
            params: { id: "5" },
        },
    },
];

const TestingAPI = () => {
    const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0]);

    const getMethodColor = (method: string) => {
        switch (method) {
            case "GET":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "POST":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            case "PUT":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "DELETE":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
        }
    };
    return <div>TestingAPI</div>;
};

export default TestingAPI;
