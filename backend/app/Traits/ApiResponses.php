<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

trait ApiResponses
{
    protected function ok($message, $data = []) {
        return $this->success($message, $data, 200);
    }

    protected function success($message, $data = [], $statusCode = 200) {
        return response()->json([
            'data' => $data,
            'message' => $message,
            'status' => $statusCode
        ], $statusCode);
    }

    protected function error($message) {
        return response()->json([
            'message' => $message,
        ], 400);
    }

    protected function notFound($message) {
        return response()->json([
            'message' => $message,
        ], 404);
    }

    protected function notAuthorized($message) {
        return response()->json([
            'message' => $message,
        ], 401);
    }
}
