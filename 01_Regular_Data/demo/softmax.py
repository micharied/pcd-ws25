import time
import torch

def softmax(x: torch.Tensor) -> torch.Tensor:
    a = x.amax(dim=1, keepdim=True)      # []
    b = x - a              # [4]
    y = torch.exp(b)       # [4]
    c = y.sum(dim=1, keepdim=True)       # []
    d = y / c              # [4]
    return d

v = torch.randn(4, 5)
start = time.time()

for _ in range(1):
    w = softmax(v)

elapsed = time.time() - start
print(w.sum(dim=1))
print(f"{elapsed:.6f}")
print(w)

