#!/bin/bash

# Array of service directories
services=("api" "auth" "billinghistory" "domains" "email" "payments" "settings" "store" "main")

# Loop through each service directory and start the service
for service in "${services[@]}"; do
    echo "Starting $service..."
    (cd "$service" && npm run start) &
done

# Wait for all background jobs to finish
wait

echo "All services started."
