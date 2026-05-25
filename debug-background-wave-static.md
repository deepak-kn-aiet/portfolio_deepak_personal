# Debug Session: Background Wave Static

- **Status**: [OPEN]
- **Session ID**: background-wave-static
- **Start Date**: 2026-05-23

## 1. Symptoms
- **Actual**: Background dots are visible but static (no wave animation).
- **Expected**: Background dots should exhibit a continuous wave/interference animation.

## 2. Hypotheses
1. **[Loop-Failure]**: `requestAnimationFrame` is not recurring, stopping the animation after the first frame.
2. **[Closure-Stale]**: `count` variable is not incrementing correctly or is stuck at 0 due to closure/re-render issues.
3. **[GPU-Sync]**: `positionAttribute.needsUpdate = true` is not correctly notifying Three.js to update the vertex buffer.
4. **[Amplitude-Scale]**: The wave is animating but the scale/speed is too small to be perceptible.

## 3. Evidence Collection Plan
- **Instrument 1**: Log when `DottedSurface` mounts and initializes the scene.
- **Instrument 2**: Log every 60 frames inside the `animate` loop to check `count` and `animationId`.
- **Instrument 3**: Log a sample of `positions` before and after update to verify mathematical changes.

## 4. Analysis
- **Evidence 1**: Logs confirm `DottedSurface` initializes correctly (Hypothesis A).
- **Evidence 2**: `animate` loop is firing at ~60fps based on log timestamps (Hypothesis B).
- **Evidence 3**: `count` is incrementing correctly in the loop closure (Hypothesis B).
- **Evidence 4**: Vertex data (`positions` array) is changing mathematically in every frame (Hypothesis C).
- **Conclusion**: The code is running, the math is working, and Three.js is being told to update. The "static" appearance might be due to:
    - Insufficient amplitude/speed for the current camera distance.
    - Lack of `computeBoundingSphere()` or similar geometry metadata updates that some Three.js versions require when modifying buffers.
    - Perspective issues where the Y-axis movement is hard to see from the current camera angle.

## 5. Proposed Fix
- Switch to `THREE.Clock` for frame-independent animation.
- Increase wave amplitude and speed significantly.
- Add `geometry.computeBoundingSphere()` after updates to ensure visibility.
- Adjust camera angle slightly to make Y-axis movement more apparent.
- Ensure the `needsUpdate` flag is handled at the right time.

## 6. Verification
(Pending)
