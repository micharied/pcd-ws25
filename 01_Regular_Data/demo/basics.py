import time
import torch


# size = 400
# a = torch.ones(size)
# b = torch.ones(size)

# c = a + b

# print(a.shape, b.shape, c.shape)
# print(c[0], c[1], c[2])


c = torch.tensor([[1,2,3], [4,5,2 ** 100]])
print(c.dtype)
# d = torch.ones(2, 3)

# e = c + d

# e = a + d
# print(e.shape)
# print(e[1,2])


# size = 400_000_000
# a = torch.ones(size)
# b = torch.ones(size)
# print(a.dtype)
# start = time.time()

# for _ in range(10):
#     c = a + b

# elapsed = time.time() - start
# print(f"{elapsed:.6f}")

