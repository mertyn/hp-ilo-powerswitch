# hp-ilo-powerswitch
simple power control for hp integrated lights out through a web browser

## Todo
client:
- check status when pressing button
- after pressing button, check status with a delay

server:
- api
    - get status: return hostmodel and hostname
    - action
        - timeout for reset action
        - return status (success, timeout)
- powerclient -> iloclient?
    - return full data