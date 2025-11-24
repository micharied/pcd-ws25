import time
import torch

size = 10000
points = torch.randn(size, 2)
distances = torch.zeros(size, size)

# start = time.time()

# for i in range(size):
#     for j in range(size):
#         distances[i, j] = torch.norm(points[i] - points[j])
# print(distances.max())

# elapsed = time.time() - start
# print(f"{elapsed:.6f}")


start = time.time()

points0 = points.unsqueeze(0)
points1 = points.unsqueeze(1)
differences = points0 - points1
distances = torch.norm(differences, dim=2)
print(distances.max())

elapsed = time.time() - start
print(f"{elapsed:.6f}")

start = time.time()

points0 = points.unsqueeze(0)
points1 = points.unsqueeze(1)
differences = points0 - points1
squareds = (differences * differences).sum(dim=2)
print(squareds.shape)
distances = torch.sqrt(squareds)
print(distances.max())

elapsed = time.time() - start
print(f"{elapsed:.6f}")



