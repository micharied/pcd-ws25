import torch
import time

# x = torch.tensor([-1, 2, -3, -4, 5, 6])
x = torch.randn(10_000)

start = time.time()

total = 0.0
for i in range(x.size(0)):
    if x[i] > 0:
        total += x[i]

elapsed = time.time() - start
print(f"{elapsed:.6f} sec")
print(total)

start = time.time()

mask = x > 0
filtered = torch.where(mask, x, torch.tensor(0.0))
total = filtered.sum()

elapsed = time.time() - start
print(f"{elapsed:.6f} sec")
print(total)

