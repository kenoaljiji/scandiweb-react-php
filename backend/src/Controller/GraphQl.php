<?php

namespace App\Controller;

use GraphQL\Type\Schema;
use GraphQL\Utils\BuildSchema;
use GraphQL\GraphQL as GraphQLBase;
use App\Database\Database;
use App\Type\QueryType;
use App\Type\MutationType;

class Graphql
{
    public static function handle()
    {
        // Load schema from file
        $schemaFile = __DIR__ . '/../../graphql/schema.graphql';
        $schemaContent = file_get_contents($schemaFile);
        $schema = BuildSchema::build($schemaContent);

        // Database connection
        $conn = Database::getConnection();

        // Define the schema with the query and mutation types
        $schema = new Schema([
            'query' => QueryType::getInstance(),
            'mutation' => MutationType::getInstance(),
        ]);

        // GraphQL execution
        try {
            $rawInput = file_get_contents('php://input');
            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = isset($input['variables']) ? $input['variables'] : null;

            $result = GraphQLBase::executeQuery($schema, $query, null, ['conn' => $conn], $variableValues);
            $output = $result->toArray();
        } catch (\Exception $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage()
                ]
            ];
        }

        header('Content-Type: application/json');
        echo json_encode($output);
    }
}
