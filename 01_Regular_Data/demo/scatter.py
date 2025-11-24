import torch

# r = torch.zeros(5, dtype=torch.long)
# x = torch.tensor([10, 20, 30, 40])
# i = torch.tensor([0, 2, 2, 3])
# r = r.scatter_add(0, i, x)

# print(r)

x = torch.randn(5)

indices = (x / 0.4).floor() + 10

indices = indices.to(torch.long).clamp(0, 19)

histogram = torch.zeros(20, dtype=torch.long)

histogram.scatter_add_(0, indices, torch.ones_like(indices))

print(histogram)

