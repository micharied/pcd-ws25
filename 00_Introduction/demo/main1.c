#include <stdio.h>

#define SIZE 10000
int matrix[SIZE][SIZE];

int main() {
    for(int i = 0; i < SIZE; i++) {
        for(int j = 0; j < SIZE; j++) {
            matrix[i][j] = i + j;
        }
    }

    long result = 0;
    for(int j = 0; j < SIZE; j++) {
        for(int i = 0; i < SIZE; i++) {
            result += matrix[i][j];
        }
    }

    printf("%ld\n", result);
}
