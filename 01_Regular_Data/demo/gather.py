import torch

x = torch.tensor([10, 20, 30, 40])
i = torch.tensor([0, 2, 2, 3])
r = x[i]

print(r)

embedding = torch.tensor([
    [1,2,3],
    [4,5,6],
    [4,5,6],
    [4,8,6],
    [2,5,6],
    [4,0,6]
])

tokens = [0, 4, 2, 1, 1, 2, 3]

input = embedding[tokens]


