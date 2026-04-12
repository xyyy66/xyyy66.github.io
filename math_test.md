# 数学引擎渲染测试 (Raw Source)

## 1. 基础行内公式 (Inline)
测试文本对齐：设 $f(x) = \sin(x) e^{-x}$，则其导数 $f'(x)$ 在 $x=0$ 处的值为 $1$。
测试特殊字符：$\alpha, \beta, \gamma, \Gamma, \omega, \Omega, \phi, \varphi, \hbar$。

## 2. 巨算符与上下限 (Big Operators)
测试求和、积分、乘积的上下标位置：

$$\sum_{i=1}^{n} i^3 = \left( \frac{n(n+1)}{2} \right)^2$$

$$\oint_{\partial \Sigma} \mathbf{E} \cdot d\mathbf{l} = -\frac{d}{dt} \iint_{\Sigma} \mathbf{B} \cdot d\mathbf{S}$$

## 3. 矩阵与定界符 (Matrices & Delimiters)
测试多种括号和复杂矩阵：

$$
\text{Rotation Matrix: }
R(\theta) = \begin{bmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{bmatrix}
$$

$$
\mathbf{H}\psi = \left[ -\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t) \right] \psi = i\hbar \frac{\partial\psi}{\partial t}
$$

## 4. 多行对齐与分类讨论 (Alignment & Cases)
测试 `aligned` 和 `cases` 环境：

$$
\begin{aligned}
(a+b)^2 &= (a+b)(a+b) \\
&= a^2 + ab + ba + b^2 \\
&= a^2 + 2ab + b^2
\end{aligned}
$$

$$
|x| = \begin{cases} 
x & \text{if } x \geq 0 \\
-x & \text{if } x < 0 
\end{cases}
$$

## 5. 字体与样式 (Fonts)
测试各种数学字体：
- Blackboard Bold: $\mathbb{R, C, Z, N, Q}$
- Calligraphic: $\mathcal{L, M, N, O}$
- Fraktur: $\mathfrak{g, h, p}$
- Bold Italic: $\boldsymbol{\mu, \sigma, \tau}$

## 6. 极限与分式嵌套 (Fractions & Limits)
测试渲染深度：

$$
L = \lim_{x \to 0} \frac{\sqrt{1+x} - \sqrt{1-x}}{x} = \frac{\frac{1}{2\sqrt{1+0}} - \frac{-1}{2\sqrt{1-0}}}{1} = 1
$$

$$
x = a_0 + \cfrac{1}{a_1 + \cfrac{1}{a_2 + \cfrac{1}{a_3 + \dots}}}
$$