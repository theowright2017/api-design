## Blocking code

- Node is still single threaded
- Sync code will still block the main thread, and potentially prevent responding to server calls, etc
- Intensive code should be async

- Or use child process (similar to web worker)


## Testing

- Using Supertest we can mock entire api call
