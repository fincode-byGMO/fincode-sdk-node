#!/bin/bash

tests=(
    "test:v1/bulk.payment"
    "test:v1/card"
    "test:v1/customer"
    "test:v1/payment"
    "test:v1/plan"
    "test:v1/platform_account"
    "test:v1/session.cardRegistration"
    "test:v1/session.payment"
    "test:v1/subscription"
    "test:v1/tenant"
)

failed_count=0
success_count=0

for test in "${tests[@]}"
do 
    echo test = $($test)
    yarn $test

    echo sleep 0.25s
    sleep 0.25
    echo \n
done

