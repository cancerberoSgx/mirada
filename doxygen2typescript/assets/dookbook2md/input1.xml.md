The method makes a new matrix header for \*this elements. The new matrix
may have a different size and/or different number of channels. Any
combination is possible if:

-   No extra elements are included into the new matrix and no elements
    are excluded. Consequently, the product rows\*cols\*channels() must
    stay the same after the transformation.

-   No data is copied. That is, this is an O(1) operation. Consequently,
    if you change the number of rows, or the operation changes the
    indices of elements row in some other way, the matrix must be
    continuous. See Mat::isContinuous .

For example, if there is a set of 3D points stored as an STL vector, and
you want to represent the points as a 3xN matrix, do the following:

    std::vector<Point3f> vec;
    ...
    Mat pointMat = Mat(vec). // convert vector to Mat, O(1) operation
                      reshape(1). // make Nx3 1-channel matrix out of Nx1 3-channel.
                                  // Also, an O(1) operation
                         t(); // finally, transpose the Nx3 matrix.
                              // This involves copying all the elements

cn New number of channels. If the parameter is 0, the number of channels
remains the same. rows New number of rows. If the parameter is 0, the
number of rows remains the same.
