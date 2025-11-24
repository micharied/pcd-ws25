import time
import torch

input = torch.arange(64).view(8, 8)
# torch.tensor([
#     [3, 8, 1, 3, 4, 9, 2, 5],
#     [3, 8, 1, 3, 4, 9, 2, 5],
#     [3, 8, 1, 3, 4, 9, 2, 5],
#     [3, 8, 1, 3, 4, 9, 2, 5],
#     [3, 8, 1, 3, 4, 9, 2, 5],
#     [3, 8, 1, 3, 4, 9, 2, 5],
#     [3, 8, 1, 3, 4, 9, 2, 5],
#     [3, 8, 1, 3, 4, 9, 2, 5],
#     [3, 8, 1, 3, 4, 9, 2, 5],
#     [3, 8, 1, 3, 4, 9, 2, 5]])

start = time.time()
kernel = torch.tensor([
    [1/9, 1/9, 1/9],
    [1/9, 1/9, 1/9],
    [1/9, 1/9, 1/9]])

print(input.shape)

print(kernel.shape)

windows = input.unfold(0, 3, 1).unfold(1, 3, 1)
print(windows.shape)
result = (kernel * windows).sum(dim=(2,3))

elapsed = time.time() - start
print(f"{elapsed:.6f}")
print(result)

