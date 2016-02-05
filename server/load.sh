#!/bin/bash

function infinite_loop { 
    while true ; do
        yes > /dev/null
    done
}

# Either use environment variables for DURATION, or define them here
NUM_CPU=$(grep -c ^processor /proc/cpuinfo 2>/dev/null || sysctl -n hw.ncpu)
DURATION=$(($NUM_CPU*10))
PIDS=()
for i in `seq ${NUM_CPU}` ;
do
# Put an infinite loop on each CPU
    infinite_loop &
    PIDS+=("$!")
done

# Wait DURATION seconds then stop the loops and quit
sleep ${DURATION}

# Parent kills its children 
for pid in "${PIDS[@]}"
do
    kill $pid
    killall yes
done

